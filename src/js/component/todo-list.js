import React, { useState, useEffect } from "react";
import { Task } from "./task";

export const Todo = () => {
	const [todoVal, setTodoVal] = useState("");
	const [listItems, setListItem] = useState([]);
	const getTasks = () => {
		fetch(
			"https://3000-itrytocodething-flaskmys-r6fxst6sr92.ws-us38.gitpod.io/todos"
		)
			.then((resp) => (resp.ok ? resp.json() : new Error("help")))
			.then((resp) => setListItem(resp))
			.catch((e) => console.log(e, "help"));
	};
	const addTask = (e) => {
		if (e.keyCode == 13 && todoVal != "" && !/^\s*$/.test(todoVal)) {
			let taskObj = {
				label: todoVal.trim(),
			};
			fetch(
				"https://3000-itrytocodething-flaskmys-r6fxst6sr92.ws-us38.gitpod.io/todos",
				{
					method: "POST",
					body: JSON.stringify(taskObj),
					headers: {
						"Content-type": "application/json",
					},
				}
			)
				.then((resp) => {
					if (resp.ok) {
						return resp.json();
					}
				})
				.then((resp) => setListItem(resp))
				.catch((e) => console.log(e, "help me"));
			setTodoVal("");
		}
	};
	const removeTask = (e) => {
		let taskID = e.target.parentElement.parentElement.id;
		if (e.target.nodeName == "I") {
			fetch(
				`https://3000-itrytocodething-flaskmys-r6fxst6sr92.ws-us38.gitpod.io/todo/${taskID}`,
				{
					method: "DELETE",
				}
			)
				.then((resp) => {
					if (resp.ok) return resp.json();
				})
				.then((resp) => setListItem(resp));
		}
	};
	const markDone = (task) => {
		let isDone = task.done ? false : true;
		console.log(task);
		console.log(task.id);
		fetch(
			`https://3000-itrytocodething-flaskmys-r6fxst6sr92.ws-us38.gitpod.io/todo/${task.id}`,
			{
				method: "PUT",
				body: JSON.stringify({ done: isDone }),
				headers: {
					"Content-type": "application/json",
				},
			}
		)
			.then((resp) => (resp.ok ? resp.json() : new Error("help")))
			.then((resp) => setListItem(resp))
			.catch((e) => console.log(e));
	};
	useEffect(() => {
		getTasks();
	}, []);
	console.log(listItems);

	return (
		<div>
			<h1 className="display-1 text-center">todo</h1>
			<div className="row mt-3">
				<div className="col-12 col-sm-6 mx-auto">
					<div className="todo paper pb-0 px-3">
						<input
							className="form-control"
							type="text"
							name="todoInput"
							id="todoInput"
							placeholder="What needs to be done?"
							value={todoVal}
							onChange={(e) => setTodoVal(e.target.value)}
							onKeyUp={addTask}
						/>
						<ul className="list-group py-2" onClick={removeTask}>
							{listItems.length > 0 ? (
								listItems.map((todo, i) => (
									<Task
										label={todo.label}
										index={i}
										done={todo.done}
										id={todo.id}
										task={todo}
										markDone={markDone}
									/>
								))
							) : (
								<small className="text-muted text-center">
									<em>no tasks</em> &#128546;
								</small>
							)}
						</ul>
						<div className="paper-foot p-0 m-0">
							{listItems.length > 0 ? (
								<small className="count text-muted">
									<em>
										{`${listItems.length} ${
											listItems.length > 1
												? `items`
												: `item`
										} left `}
									</em>
									<span>&#128521;</span>
								</small>
							) : null}
						</div>
					</div>
				</div>
			</div>
			{/* <small className="text-muted text-center d-block mt-3">
				{todoVal}
			</small> */}
		</div>
	);
};
