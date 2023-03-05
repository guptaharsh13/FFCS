<a name="readme-top"></a>

<div align="center">

  <h3 align="center">Dyte Task (FFCS)</h3>

  <p align="center">
    <a href="https://github.com/dyte-submissions/vit-hiring-2023-phase-1-guptaharsh13/issues">Report Bug</a>
    ·
    <a href="https://github.com/dyte-submissions/vit-hiring-2023-phase-1-guptaharsh13/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#deployment">Deployment</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#local-run">Local Run</a></li>
        <li><a href="#docker-run">Docker Run</a></li>
      </ul>
    </li>
    <li><a href="#design-document">Design Document</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project will create a web application that will allow administrators to configure slots, add faculties, and allocate courses at specific slots. Students will be able to register for courses by specifying the course ID, slot ID(s), and faculty ID. The application will ensure that only one course can be selected at a specific time slot, and that the selected faculty must be teaching the course at that slot. The application will be built using a relational database (PostgreSQL or MySQL) and will adhere to the [OpenAPI schema](https://dyte-hiring-docs.pages.dev/#/operations/post-admin-student).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Deployment

Link: [http://20.239.186.235](http://20.239.186.235/)

```
STUDENT_AUTH_TOKEN=
ADMIN_AUTH_TOKEN=
```

(only for the above link)

Please run the project locally if the above link is slow or doesn't work, just in case

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
- ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
- ![Microsoft Azure](https://img.shields.io/badge/Microsoft_Azure-0089D6?style=for-the-badge&logo=microsoft-azure&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- Install [Node.js and npm](https://nodejs.org/en/download/)
- Install [PostgreSQL](https://www.postgresql.org/download/)

### Setup

- Clone the repo

  ```sh
  git clone https://github.com/dyte-submissions/vit-hiring-2023-phase-1-guptaharsh13
  ```

- Change into the directory

  ```shell
  cd vit-hiring-2023-phase-1-guptaharsh13
  ```

- **Environment Variables**

  ```sh
  touch .env
  ```

  **For running this project successfully you'll need to create a `.env` file and store your PostgreSQL there like [`.env.sample`](https://github.com/dyte-submissions/vit-hiring-2023-phase-1-guptaharsh13/blob/master/.env.sample).**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

### Local Run

Install NPM packages

```sh
npm i
```

Start the app

```sh
npm start
```

Get the STUDENT_AUTH_TOKEN and ADMIN_AUTH_TOKEN

```sh
npm run auth
```

### Docker Run

```dh
docker-compose up --build -d
```

Get the STUDENT_AUTH_TOKEN and ADMIN_AUTH_TOKEN

```sh
docker exec -it api sh
npm run auth
```

Now, may access the app on http://localhost:PORT

PORT: You must have already specified in the .env file (3000 by default)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DESIGN DOCUMENT -->

## Design Document

You may read more about the implementation of the project [here]().

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Harsh Gupta - hg242322@gmail.com

GitHub Link: [https://github.com/guptaharsh13](https://github.com/guptaharsh13)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<p align="center">Made with ❤ by Harsh Gupta</p>
