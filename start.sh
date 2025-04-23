#!/bin/bash

# Start the Node.js server
(cd todo-be-app && npm run serve) &

# Start the React app
(cd todo-fe-app && npm run dev) &

# Wait for all background jobs to finish
wait
