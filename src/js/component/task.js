import React from "react";

export const Task = (props) => {
	console.log(props.task);
	console.log(props.markDone);
	let task = props.task;
	return (
		<li
			id={task.id}
			className={`list-group-item ${task.done ? "marked" : ""}`}
			onClick={() => props.markDone(task)}>
			{task.label}
			<span className="trash">
				<i className="far fa-trash-alt"></i>
			</span>
		</li>
	);
};
