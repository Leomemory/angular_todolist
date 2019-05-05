import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service'  //导入服务

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  public msg:any= ' Hello,My TodoList！';
  public todo:any = '';
  public todoList = [];
  public doneList = [];
  
  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.initTodo()
  }

  initTodo(){
    if(this.storage.getItem('todoList')){
      this.todoList=this.storage.getItem('todoList')
    }

    if(this.storage.getItem('doneList')){
      this.doneList=this.storage.getItem('doneList')
    }
  }
  
  btnAddTodo(){
    let todoObj = {
      todo:this.todo,
      done:false
    }
    if(this.todo!==''){
       let tempList = this.storage.getItem('todoList')
       if(tempList){
         tempList.push(todoObj);
         this.storage.setItem('todoList',tempList);
       }else{
         let tempData = [];
         tempData.push(todoObj);
         this.storage.setItem('todoList',tempData);
       }
       this.todoList.push(todoObj);
       this.todo = '';
    }
  }

  addTodo(e){
    let todoObj = {
      todo:this.todo,
      done:false
    }
    if(e.keyCode == 13 && this.todo!==''){
       let tempList = this.storage.getItem('todoList')
       if(tempList){
         tempList.push(todoObj);
         this.storage.setItem('todoList',tempList);
       }else{
         let tempData = [];
         tempData.push(todoObj);
         this.storage.setItem('todoList',tempData);
       }
       this.todoList.push(todoObj);
       this.todo = '';
    }
  }

  deleteTodo(index,done){
    if(done){
      this.todoList.splice(index,1);
      this.storage.setItem('todoList',this.todoList);
    }else{
      this.doneList.splice(index,1);
      this.storage.setItem('doneList',this.doneList);
    }
  }

  changeTodo(index,done){
    if(done){
      var tempTodo = this.todoList[index];
      this.todoList.splice(index,1);
      this.doneList.push(tempTodo);
      this.storage.setItem('todoList',this.todoList);
      this.storage.setItem('doneList',this.doneList);
    }else{
      var tempDone = this.doneList[index];
      this.doneList.splice(index,1);
      this.todoList.push(tempDone);
      this.storage.setItem('todoList',this.todoList);
      this.storage.setItem('doneList',this.doneList);
    }
  }

  clearData(){
    localStorage.clear()
    this.todoList = [];
    this.doneList = [];
  }
}
