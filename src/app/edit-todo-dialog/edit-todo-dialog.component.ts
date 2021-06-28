import { NgForm } from '@angular/forms';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.scss']
})
export class EditTodoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo
  ) { }

  ngOnInit(): void {
  }

  onFormSubmit(form:NgForm){
    if(form.invalid) return
    const updateTodo = {
      ...this.todo,
      ...form.value
    }

    this.dialogRef.close(updateTodo)
  }

  close() {
    this.dialogRef.close()
  }
}
