// 为了使id不会重复: 写一个使id从0开始递增的代码

// 从记录里面读取id的最大值
let id:number=parseInt(window.localStorage.getItem('_idMax') || '0') || 0
function createId(){
    id++
    window.localStorage.setItem('_idMax',id.toString())
    return id
}

export default createId