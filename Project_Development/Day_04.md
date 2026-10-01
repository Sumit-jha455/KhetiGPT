Client:

client/

= React frontend

Server:

server/

= Node/Express backend

Database design:

users
farms
conversatio

architecture:
              KhetiGPT
                  |
        ┌─────────┴─────────┐
        ↓                   ↓
     CLIENT              SERVER
     React             Node/Express
        |                   |
        └─────────┬─────────┘
                  ↓
              MongoDB
                  |
        ┌─────────┴─────────┐
        ↓                   ↓
    Gemini API          Weather API