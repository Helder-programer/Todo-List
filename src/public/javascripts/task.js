const setTagAsDone = async (HTMLelement, id, event) => {
    event.preventDefault();
    try {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = JSON.stringify({ task: { done: HTMLelement.checked } });
        let response = await fetch(`/tasks/${id}?_method=put`, { headers: headers, body: body, method: 'PUT' });
        let data = await response.json();
        let task = data.task;


        if (task.done) {
            HTMLelement.checked = true;
            HTMLelement.parentNode.classList.add('has-text-success');
            HTMLelement.parentNode.classList.add('is-italic');

        } else {
            HTMLelement.checked = false;
            HTMLelement.parentNode.classList.remove('has-text-success');
            HTMLelement.parentNode.classList.remove('is-italic');
        }
    } catch (error) {
        alert('Erro ao atualizar uma tarefa!');
    }

}