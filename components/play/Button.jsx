import React from "react"
/*
Button used for shopping, friends, slime, and backpack

Param:
    type: 
        1: shopping
        2: friends
        3: slimes
        4: backpack
*/

const types = [
    { title: 'shopping', id = 1},
    { title: 'friends', id = 2},
    { title: 'slimes', id = 3},
    { title: 'backpack', id = 4}
]

export default function Button(type) {

    function handleBtnClick(title) {
        return (
            <a href="TODO"></a>
        )
    }

    // get the corresponding image and href by type (input)
    const titleToRender = types.map(item => function (item) {
        if (item.id == type) {
            const imgLink = "/../../../public/assets/icons"+item.title
            return (
                <button onClick={() => handleBtnClick(item.title)}>
                    <img src={imgLink}></img>
                </button>
            )
        }
    })
    return titleToRender
}