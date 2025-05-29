#!/bin/bash
echo Starting server
python -m uvicorn main:app --workers 1 --host 0.0.0.0 --port 80
