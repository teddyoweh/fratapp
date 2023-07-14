const color_hashmap = {
    'white':'#111',
    'black':'white',
    '#333':"white",
    '#ccc':"#222",
    '#eee':'#222',
    '#eeee':'#333',
    '#aaa':'#555',
    '#222':'#323232',
    "#ddd":'#333',
    'grey':"#444",
    'gray':'#bbb',
    'grayy':'#666',
    '#777777':'#666',
    '#c3c3c3':'#888',
    '#f5f5f5':'#222'
}
const color_scheme = (mode,color)=>{
    if(mode=='light'){
        
        return color
    }else{
        return color_hashmap[color]
    }
}
export {color_scheme}