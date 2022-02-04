import React, { useState } from "react";

export const Todo = () => {
	const [todoVal, setTodoVal] = useState();
	const [listItems, setListItem] = useState([]);

	return (
		<div>
			<h1 className="display-1 text-center">todo</h1>
			<div className="row mt-3">
				<div className="col-12 col-sm-6 mx-auto">
					<div className="todo paper">
						<input
							className="form-control"
							type="text"
							name="todoInput"
							id="todoInput"
							placeholder="What needs to be done?"
							value={todoVal}
							onChange={(e) => setTodoVal(e.target.value)}
							onKeyUp={(e) => {
								if (e.keyCode == 13) {
									setListItem([...listItems, todoVal]);
									setTodoVal("");
								}
							}}
						/>
						<ul className="list-group py-2">
							{listItems.map((task) => (
								<li className="list-group-item">
									{task}
									<span className="trash">
										<i class="far fa-trash-alt"></i>
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
