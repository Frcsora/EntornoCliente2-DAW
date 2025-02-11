addEventListener("DOMContentLoaded", async (event) => {
    const header = document.createElement("header");
    document.body.insertAdjacentElement('afterbegin', header);
    const divFoto = document.createElement("div");
    header.insertAdjacentElement('beforeend', divFoto);
    const img = document.createElement("img");
    divFoto.classList.add("headerimg");
    fetch("https://randomuser.me/api")
        .then(res => res.json())
        .then(data => {
            img.src = data['results'][0].picture.large;
            img.alt = "Foto de currículum";
            divFoto.insertAdjacentElement("afterbegin", img);
        }).catch(err => console.log(err));
    fetch("curriculum.json")
        .then(res => res.json())
        .then(data => {
            const divTexto = document.createElement("div");
            divTexto.classList.add("headertext");
            header.insertAdjacentElement('beforeend', divTexto);
            const h1 = document.createElement("h1");
            divTexto.insertAdjacentElement('beforeend', h1);
            const h2 = document.createElement("h2");
            divTexto.insertAdjacentElement('beforeend', h2);
            const nombre = data.fullname.name;
            const apellido1 = data.fullname.surnames.surname1
            const apellido2 = data.fullname.surnames.surname2
            h1.innerText = `${nombre} ${apellido1} ${apellido2}`;
            const ocupacion = data.occupation;
            h2.innerText = `${ocupacion}`;
            const main = document.createElement("main");
            header.insertAdjacentElement('afterend', main);
            const sidebar = document.createElement("div");
            sidebar.classList.add("sidebar");
            main.insertAdjacentElement('beforeend', sidebar);
            const maincontact = document.createElement("div");
            sidebar.insertAdjacentElement('beforeend', maincontact);
            const h3 = document.createElement("h3");
            maincontact.insertAdjacentElement('beforeend', h3);
            h3.innerText = "Información de contacto"
            maincontact.classList.add("mainSidebar");
            const smalltel = document.createElement("small");
            smalltel.innerText = data.contact.phone_number;
            maincontact.insertAdjacentElement('beforeend', smalltel);
            const smallemail = document.createElement("small");
            maincontact.insertAdjacentElement('beforeend', smallemail);
            smallemail.innerText = data.contact.email
            const smallwebpage = document.createElement("small");
            maincontact.insertAdjacentElement('beforeend', smallwebpage);
            const webpage = document.createElement("a");
            webpage.href = "https://www.fsoraquevedo.com";
            webpage.innerText = "Mi web personal";
            smallwebpage.insertAdjacentElement('beforeend', webpage);
            const mainLanguages = document.createElement("div");
            sidebar.insertAdjacentElement('beforeend', mainLanguages);
            const h3Languages = document.createElement("h3");
            mainLanguages.insertAdjacentElement('beforeend', h3Languages);
            mainLanguages.classList.add("mainSidebar")
            h3Languages.innerText = "Idiomas";
            Array.from(data.languages).forEach(language => {
                const smallLanguage = document.createElement("small");
                smallLanguage.innerText = `${language.language}: ${language.level}`;
                mainLanguages.insertAdjacentElement('beforeend', smallLanguage);
            })
            const mainSkills = document.createElement("div");
            sidebar.insertAdjacentElement('beforeend', mainSkills);
            const h3Skills = document.createElement("h3");
            mainSkills.insertAdjacentElement('beforeend', h3Skills);
            h3Skills.innerText = "Soft skills";
            mainSkills.classList.add("mainSidebar");
            Array.from(data.soft_skills).forEach(skill => {
                const smallSkill = document.createElement("small");
                smallSkill.innerText = `${skill}`;
                mainSkills.insertAdjacentElement('beforeend', smallSkill);
            })
            const projectDiv = document.createElement("div");
            projectDiv.classList.add("mainSidebar");
            sidebar.insertAdjacentElement('beforeend', projectDiv);
            const h3Projects = document.createElement("h3");
            projectDiv.insertAdjacentElement('beforeend', h3Projects);
            h3Projects.innerText = "Mis proyectos";
            Array.from(data.projects).forEach(project => {
                const smallProject = document.createElement("small");
                projectDiv.insertAdjacentElement('beforeend', smallProject);
                const enlace = document.createElement("a");
                smallProject.insertAdjacentElement('beforeend', enlace);
                enlace.href = project.url;
                enlace.innerText = project.name;
            })
            const maincontent = document.createElement("div");
            main.insertAdjacentElement('beforeend', maincontent);
            const studies = document.createElement("div");
            studies.classList.add("mainContentDiv");
            maincontent.insertAdjacentElement('beforeend', studies);
            maincontent.classList.add("maincontent");
            const h2studies = document.createElement("h2");
            h2studies.innerText = "Estudios académicos";
            studies.insertAdjacentElement('beforeend', h2studies);
            const studiesDiv = document.createElement("div");
            studiesDiv.classList.add("studiesDiv");
            studies.insertAdjacentElement('beforeend', studiesDiv)
            Array.from(data.studies).forEach(study => {
                const studyDiv = document.createElement("div");
                studiesDiv.insertAdjacentElement("beforeend", studyDiv);
                const h4study = document.createElement("h4");
                studyDiv.insertAdjacentElement('beforeend', h4study);
                h4study.innerText = `${study.title}`;
                const pschool = document.createElement("p");
                studyDiv.insertAdjacentElement('beforeend', pschool);
                pschool.innerText = `Cursado en: ${study.academic_centre}, ${study.city}`;
                const pyears = document.createElement("p");
                studyDiv.insertAdjacentElement('beforeend', pyears);
                pyears.innerText = `Cursado durante: ${study.academic_year_start}-${study.academic_year_finish}`;
                if(study !== data.studies[data.studies.length - 1]){
                    const hr = document.createElement("hr");
                    studiesDiv.insertAdjacentElement('beforeend', hr);
                }
            })
            const hr2 = document.createElement("hr");
            maincontent.insertAdjacentElement('beforeend', hr2);
            const worksDiv = document.createElement("div");
            maincontent.insertAdjacentElement('beforeend', worksDiv);
            worksDiv.classList.add("mainContentDiv");
            const h2Works = document.createElement("h2");
            worksDiv.insertAdjacentElement('beforeend', h2Works);
            h2Works.innerText = "Experiencia Laboral";
            const workDiv = document.createElement("div");
            worksDiv.insertAdjacentElement('beforeend', workDiv);
            Array.from(data.works).forEach(work => {
                const h4work = document.createElement("h4");
                workDiv.insertAdjacentElement('beforeend', h4work);
                workDiv.classList.add("workDiv");
                h4work.innerText = `${work.company}`;
                const pJob = document.createElement("p");
                workDiv.insertAdjacentElement('beforeend', pJob);
                pJob.innerText = `Puesto: ${work.job}`;
                const pDuration = document.createElement("p");
                workDiv.insertAdjacentElement('beforeend', pDuration);
                pDuration.innerText = `${work.inicio_fin}`;
                console.log(work);
                if(work !== data.works[data.works.length - 1]){
                    const hr = document.createElement("hr");
                    workDiv.insertAdjacentElement('beforeend', hr);
                }
            })
        }).catch(err => console.log(err));
})