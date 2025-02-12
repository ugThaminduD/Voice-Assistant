@echo off
title Voice Assistance

echo Starting Client...
start cmd /k "cd /d client && npm start"

echo Starting Admin Panel...
start cmd /k "cd /d server && npm start"

@REM echo Starting Server...
@REM start cmd /k "cd /d server && nodemon server"

echo All services started.

