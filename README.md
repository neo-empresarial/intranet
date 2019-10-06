# NEO's Intranet

This is the source code of NEO's Intranet. This website was developed usign Django Rest + React. The server is currently living in a heruku app.

## Requirements

The program has the following requirements that needs to be installed before you proced to [Installation](##Instalation).

- NodeJS
- nvm
- Python
- pyenv
- postgresql
- python-psycopg2
- libpq-dev

## Installation

Clone this project and cd into it with:

```bash
git clone https://github.com/neo-empresarial/intranet.git
cd intranet
```

Set python version using [pyenv](https://github.com/pyenv/pyenv) and install python requirements using [pipenv](https://github.com/pypa/pipenv) with:

```bash
pyenv local 3.6.9
pip install pipenv
pipenv install
```

and dev requirements with:

```bash
pipenv install --dev
```

Install right node version and requirements with:

```bash
nvm install
npm run install-dependencies
```

and dev requirements with:

```bash
npm install --only=development
```

## Usage

Use the following commands in the root folder of the project.

Run the frontend part of intranet with:

```bash
npm run dev
```

You run the build option with:

```bash
npm run start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

The content of this project is licensed under the [MIT license](LICENSE).
