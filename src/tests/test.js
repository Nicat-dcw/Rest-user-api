const axios = require("axios")
axios
    .post("https://Rest-user-api.nicatdcw.repl.co/admin/accounts/create?username=Only&password=Cheeini", {
    headers:{
        Authorization:"Secret"
    },
    body:{
        username:"Only Cheeini",
        password:"12345678_"
    }
})
    .then(x => {
    console.log(x.data)
})