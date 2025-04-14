// 이런 라이브러리를 안쓰고 직접 만든다면??
// 라이브러리를 안쓰고 내손으로 만든다면? 
const asciiFont={
    H:[
        "|  |",
        "|--|",
        "|  |",
        "|  |",
      

    ],
    
    E:[
        "",
        "",
        "",
        "",

    ],

    L:[

    ],

    L:[

    ],

    O:[

    ]
}

function printAsciiArt(text) {
    const chars = text.toUpperCase().split('');

    for (let line = 0 ; line < 3 ; i++) {
        let output = '';
        for (const ch of chars) {
            output += (asciiFont[ch]? asciiFont[ch][line]: '   ')
        }
    }
}