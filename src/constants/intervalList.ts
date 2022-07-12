// object.freeze(a)  :把a锁定不能进行修改
const intervalList=Object.freeze([
    {text:'按天',value:'day'},
    {text:'按周',value:'week'},
    {text:'按月',value:'month'}
])

export default intervalList