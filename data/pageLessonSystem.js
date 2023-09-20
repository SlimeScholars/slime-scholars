const lesson = {
    pages:[
        {
            type: "text | question | quiz",
            index: "number",
            title: "string",
            icon: "blank | string",
            sections: "[section]",
            section:{
                index: "number",
                sectionType: "string",
                sectionNumber: "number",
                explanation: "string",
                options: "option[]",
                blank: "string[]",
                afterBlank: "string",
                explanation: "string"
            }
        }
    ]
}