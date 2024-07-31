from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
app.config.from_object('config.Config')

jwt = JWTManager(app)
