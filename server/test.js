const data={
    "error": {
      "errors": [
        {
          "type": "field",
          "value": "hahathis@",
          "msg": "Provide valid email",
          "path": "email",
          "location": "body"
        },
        {
          "type": "field",
          "msg": "must have at least 8 characters",
          "path": "password",
          "location": "body"
        }
      ]
    }
  }
  console.log(data.error.errors[0]['msg'])