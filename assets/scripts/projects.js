var projectsTest = [
    {
        name: 'Portfolio',
        description: 'The page you\'re on! HTML, CSS, Vanilla JS, and VueJS',
        imgURL: 'lel.jpg',
        liveURL: 'http://jacobschmocker.com',
        githubURL: 'https://github.com/theschmocker'
    }
]

Vue.component('project', {
    props: ['project'],
    template: `
        <figure>
            
            <h3>{{ project.name }}</h3>
            <p>{{ project.description }}</p>
            <div>
                <a :href="'' + project.liveURL">View Project</a>
                <a :href="'' + project.githubURL">Github</a>
            </div>
        </figure>
    `
});

var app = new Vue({
    el: '.projects',
    data: {
        sortBy: 'all', // options: all, full, front, back
        projects: projectsTest,
    },
    methods: {

    },
});
