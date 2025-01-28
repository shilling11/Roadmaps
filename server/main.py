import os
from typing import List
import json

import ollama
from dotenv import load_dotenv
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_session import Session
from flask_redis import FlaskRedis
import bcrypt

app = Flask(__name__)
app.config['REDIS_URL'] = 'redis://localhost:6379/0'
redis_client = FlaskRedis(app)

app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_REDIS'] = redis_client
app.config['PERMANENT_SESSION_LIFETIME'] = 3600
Session(app)

load_dotenv()
app.secret_key = os.getenv("SECRET_KEY")

CORS(app)

class Task:
    def __init__(self, task:str, duration:str, priority:int):
        self.task = task
        self.duration = duration
        self.priority = priority

def deserialise_tasks(decomposed:str) -> List[Task]:
    '''Format initial JSON response into Task objects'''
    tasks = []
    possibility = None

    task_json = json.loads(decomposed)

    for json_obj in task_json:
        if "possibility" in json_obj:
            possibility = json_obj['possibility']
        else:
            task = Task(**json_obj)
            tasks.append(task)
            
    return "Items deserialised"

@app.post('/sign-up')
def sign_up():
    '''Sign up for account and store details'''
    email = request.json["email"]
    password = request.json["password"].encode()

    if redis_client.exists(email):
        return jsonify(message="E-mail already in use"), 400
    
    password_hash = bcrypt.hashpw(password, bcrypt.gensalt())
    redis_client.set(email, password_hash)

    session['user'] = email

    return jsonify({
        "message": "Successfully signed up",
        "session_id": session.sid
    }), 200

@app.post('/sign-in')
def sign_in():
    '''Sign in to account'''
    email = request.json["email"]
    password = request.json["password"]
    
    if redis_client.exists(email):
        if not bcrypt.checkpw(password.encode(), redis_client.get(email)):
            return jsonify(message="Incorrect password"), 400
    else:
        return jsonify(message="E-mail doesn't exist"), 400
    
    session['user'] = email

    return jsonify({
        "message": "Successfully signed in",
        "session_id": session.sid
    }), 200

# GET request includes goal, duration and context
@app.route('/goal/init', methods=['GET'])
def get_decomposition() -> str:
    '''Get user goal and decompose into smaller tasks from pre-defined prompt'''

    goal = request.args.get('goal')
    duration = request.args.get('duration')
    context = request.args.get('context')

    prompt = f'''
    Don't add any more characters than what has been prompted, and only respond with valid JSON.

    In order to {goal} within {duration} given that {context}, provide a comprehensive list of all tasks needed
    to be done. The schema is "task, duration, priority", where task is the task to be performed, duration is frequency of task,
    and priority is a number 1-10 indicating how important it is for achieving the end goal. Decompose tasks until they are specific and actionable, and don't give ranges.
    Add one more item within the same JSON array after all task objects with the key "possibility", with the value being a score between 1-10 of how possible the overall
    goal is to achieve within the timeframe.

    An example of the format would be [{{"task":"example", "duration":"example", "priority":example}},...,
    {{"possibility":example}}]
    
    For duration, use daily, weekly or monthly, or x times per day/week/month/year for specificity. If it needs to be done at a certain point,
    like in the first day or first week, add it in brackets. For example, "once (first day)"
    Make sure to include a way for the user to track their progress from start to end.
    
    There should be a clear progression towards the end goal and tasks should be adapted so that this end goal is met in a timely manner,
    giving specific time periods as mentioned previously.'''

    # Generate response from LLM
    try:
        response = ollama.chat(
            model='llama3.2',
            messages=[{'role':'user', 'content':prompt}]
        )

        print(response.message.content)
        return deserialise_tasks(response.message.content)

    except ollama.ResponseError as e:
        return f"ResponseError: {e}"


if __name__ == '__main__':
    app.run(debug=True)