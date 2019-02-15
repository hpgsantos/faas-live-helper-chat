# Ideaah Faas Handle Survey

### Commands

```
lambda-local -l index.js -h handler  -e event_s3-put.js
zip -r ideaah-faas-handle-survey.zip node_modules/ schema/ helper/ index.js
```

### POST content

```json
    "clientCode": "ideaah-df-lago-sul",
    "respondent":{},
    "appliedTo":{},
    "content": [
        {
          "question": "Questao 01",
          "response": "4"
        },
        {
          "question": "Questao 01",
          "response": "1"
        }
      ]
```