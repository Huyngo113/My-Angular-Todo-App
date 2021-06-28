import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { DataService } from '../shared/data.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos!: Todo[]

  showValidationErrors?: boolean

  constructor(private dataService: DataService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos()
  }

  onFormSubmit(form: NgForm): boolean|any{
    if(form.invalid) return this.showValidationErrors = true
    this.dataService.addTodo(new Todo(form.value.task,false))
    this.showValidationErrors = false
    form.reset()
  }

  toggleCompleted(todo: Todo){
    todo.completed = !todo.completed
  }

  editTodo(todo: Todo){
    const index = this.todos.indexOf(todo)
    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo
    })
    dialogRef.afterClosed().subscribe(res =>{
      if(res) {
        this.dataService.update(index, res)
      }
    })
  }

  deleteTodo(todo: Todo){
    const index: number = this.todos.indexOf(todo)
    this.dataService.deleteTodo(index)
  }
}
