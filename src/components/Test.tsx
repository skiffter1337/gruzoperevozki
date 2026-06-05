import React, { useState, useEffect } from 'react';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    // Ошибка 1: забыт cleanup для setInterval
    useEffect(() => {
        fetchTodos();

        const interval = setInterval(() => {
            console.log('Auto-save drafts...');
        }, 30000);
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Ошибка 2: мутация состояния напрямую (меняет original массив)
    const addTodo = () => {
        if (!inputValue.trim()) return;

        const newTodo = {
            id: Date.now(),
            title: inputValue,
            completed: false
        };
        todos.push(newTodo); // мутация!
        setTodos(todos);
        setInputValue('');
    };

    // Ошибка 3: index как key, нет обработки ошибок
    const toggleTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    // Ошибка 4: фильтрация и сортировка вычисляются каждый рендер
    const getFilteredTodos = () => {
        let filtered = todos;

        if (filter === 'active') {
            filtered = todos.filter(todo => !todo.completed);
        } else if (filter === 'completed') {
            filtered = todos.filter(todo => todo.completed);
        }

        // Ошибка 5: sort мутирует массив
        return filtered.sort((a, b) => a.id - b.id);
    };

    // Инлайн-стили (без мемоизации)
    const styles = {
        container: { maxWidth: '500px', margin: '0 auto', padding: '20px' },
        input: { padding: '8px', marginRight: '8px', width: '70%' },
        button: { padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none' },
        todoItem: { display: 'flex', justifyContent: 'space-between', marginTop: '8px', padding: '8px', border: '1px solid #ddd' },
        filters: { margin: '20px 0', display: 'flex', gap: '10px' }
    };

    const filteredTodos = getFilteredTodos();

    if (loading) return <div style={styles.container}>Loading...</div>;

    return (
        <div style={styles.container}>
            <h1>Todo List</h1>

            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={styles.input}
                    placeholder="Add new todo..."
                />
                {/* Ошибка 6: onClick должен вызывать addTodo с проверкой */}
                <button onClick={addTodo} style={styles.button}>
                    Add
                </button>
            </div>

            <div style={styles.filters}>
                {['all', 'active', 'completed'].map(filterType => (
                    <button
                        key={filterType}
                        onClick={() => setFilter(filterType)}
                        style={{
                            ...styles.button,
                            backgroundColor: filter === filterType ? '#0056b3' : '#007bff'
                        }}
                    >
                        {filterType}
                    </button>
                ))}
            </div>

            <div>
                {/* Ошибка 7: нет проверки на пустой массив */}
                {filteredTodos.map((todo, index) => (
                    <div key={index} style={styles.todoItem}> {/* index как key - плохо */}
                        <span
                            onClick={() => toggleTodo(index)}
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                cursor: 'pointer',
                                flex: 1
                            }}
                        >
              {todo.title}
            </span>
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            style={{ ...styles.button, backgroundColor: '#dc3545' }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {/* Ошибка 8: счетчик использует todos вместо filteredTodos */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                Total: {todos.length} items
            </div>
        </div>
    );
};

export default TodoApp;