const express = require('express');
const bodyparse = require('body-parser');

const app = express();
const PORT = 3001
app.use(bodyparse.urlencoded({ extended: true }));
app.use(bodyparse.json());
app.use(bodyparse.raw());

// get - list of all todo list
const list = [{ id: 1, name: "Hasifa" }, { id: 2, name: "Akbar" }]

// array - 3
// legth - 3
// 0, 1, 2
// find the length of the array list and then increment the value by 1
// get the last element of the array and increment it by 1

app.get("/get-todos", (req, res) => {
    res.json({
        message: list,

    })
})
// post - create new todo
app.post("/add-todo", (req, res) => {
    console.log(`printing here ${JSON.stringify(req.body)}`)

    const item = req.body

    if (item.name === "") {
        res.json({
            message: "Name cannot be empty",
        })
    }

    const lastindex = list.length - 1
    const lastitem = list[lastindex]
    const newid = lastitem.id + 1
    item.id = newid
    list.push(item)
    console.log(list)



    res.json({
        message: list,
    })
});

app.delete("/deletetodo/:id", async (req, res) => {
    const deleteid = req.params.id
    let flag = false
    //console.log(deleteid)
    for (var i = 0; i < list.length; i++) {
        //console.log(i)
        console.log(list[i].id)
        if (list[i].id === Number(deleteid)) {
            list.pop(i)
            flag = true
        }

    }
    if (flag) {
        res.json({
            message: 'Deleted Subscriber'
        })

    } else {
        res.json({
            message: "item does exist"
        })
    }
})

app.patch("/update/:id", (req, res) => {
    const updateid = req.params.id
    let flag = false
    let popvalue = undefined
    for (i = 0; i <= list.length; i++) {
        if (list[i].id === Number(updateid)) {
            popvalue = list.pop(i)
            flag = true
        }
    }
    if (flag) {
        const value = req.body
        popvalue.name = value.name
        list.push(popvalue)
        res.json({
            message: "element updated successfully"
        })
    } else {
        res.json({
            message: "element not updated "
        })
    }
})

app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`);

});
