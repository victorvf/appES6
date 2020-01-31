import api from './api';

class App {
    constructor(){
        this.repositories = [];

        this.formEl = document.getElementById("repo-form");
        this.inputEl = document.querySelector("input[name=repository]");
        this.formList = document.getElementById("repo-list");

        this.registerHandlers();
    }
    
    registerHandlers(){
        this.formEl.onsubmit = event => this.addRepository(event);
    };

    setLoading(loading = true){
        if(loading === true){
            let loadEl = document.createElement('span');
            loadEl.appendChild(document.createTextNode('Carregando'));
            loadEl.setAttribute('id', 'load');

            this.formEl.appendChild(loadEl);
        }else {
            document.getElementById('load').remove();
        }
    }

    async addRepository(event){
        event.preventDefault();

        
        const {value} = this.inputEl;
        
        if (value.length === 0) {
            return;
        }

        this.setLoading();

        try{

            const { data: { name, description, html_url, owner: { avatar_url } } }  = await api.get(`/repos/${value}`);

            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url
            });

            this.inputEl.value = "";

            this.render();

        } catch(err){
            alert('O repositorio não existe!');
        }

        this.setLoading(false);
    }

    render(){
        this.formList.innerHTML = "";

        this.repositories.forEach(item=>{
            const li = document.createElement('li');

            const img = document.createElement('img');
            img.setAttribute('src', `${item.avatar_url}`);

            const strong = document.createElement('strong'); 
            strong.appendChild(document.createTextNode(item.name));

            const p = document.createElement('p');
            p.appendChild(document.createTextNode(item.description));

            const a = document.createElement('a');
            a.setAttribute('href', `${item.html_url}`);
            a.setAttribute('target', '_blank');
            a.appendChild(document.createTextNode('Acessar'));

            li.appendChild(img);
            li.appendChild(strong);
            li.appendChild(p);
            li.appendChild(a);

            this.formList.appendChild(li);

        })
    }
}

new App();
