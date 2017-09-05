var projectsTest = [
    {
        name: 'Portfolio',
        description: 'The page you\'re on! HTML, CSS, Vanilla JS, and VueJS',
        imgURL: 'assets/images/projects/portfolio.png',
        liveURL: 'http://jacobschmocker.com',
        githubURL: 'https://github.com/theschmocker'
    },
    {
        name: 'Simple Timer',
        description: 'A basic timer app built with Javascript',
        imgURL: 'assets/images/projects/simple-timer.png',
        liveURL: 'http://jacobschmocker.com/timer',
        githubURL: 'https://github.com/theschmocker/simple-timer'
    }
]

Vue.component('project', {
    props: ['project'],
    template: `
        <figure class="project">
            <img :src="project.imgURL">
            <div class="project-content">
                <div class="project-info">
                    <h3>{{ project.name }}</h3>
                    <p>{{ project.description }}</p>
                </div>
                <div class="project-buttons">
                    <a :href="'' + project.liveURL">View Project</a>
                    <a :href="'' + project.githubURL">Github</a>
                </div>
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
