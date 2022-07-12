import clone from '@/lib/clone';
import Vue from 'vue'
import Vuex from 'vuex'
import recordStore from './recordStore'

Vue.use(Vuex)   // 把vue.prototype.$store绑定到用户传的store

const store = new Vuex.Store({
  state: {  // 相当于data
    recordList:[] as RecordItem[],  // 新建一个空数组
    tagList:[] as Tag[]
  },
  mutations:{  // 相当于methods
    fetchRecords(state){   // 读取之前数据的函数
      const recordList=JSON.parse(window.localStorage.getItem('recordList') || '[]')
      state.recordList=recordList
    },
    createRecord(state,record){  // 添加数据函数
      const record2:RecordItem=clone(record)  // 拿到record后,复制一遍record
      record2.createdAt=new Date().toISOString()  // 修改其创建时间为当前时间
      state.recordList.push(record2)  // 再把经过处理后的数据push到上面建的那个数组中
      store.commit('saveRecords')  
    },
    saveRecords(state){  // 保存函数
      window.localStorage.setItem('recordList',JSON.stringify(state.recordList))
    },
    fetchTags(state){
      const tagList=JSON.parse(window.localStorage.getItem('localStorageKeyName' || '[]'))
      return state.tagList=tagList
    },
    // createTag(state,name:string){
    //   const names=state.tagList.map(item=>item.name)

    //   // 拿到tagListModel里定义的name值(name只能是 success或者duplicated)
    //   const message=tagListModel.create(name)
    //   if(message==='duplicated'){
    //     window.alert('标签名重复')
    //   }else if(message==='success'){
    //     window.alert('标签添加成功')
    //   }
    //   location.reload()
    // },
  }
})

export default store