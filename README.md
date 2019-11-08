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

### PostgreSQL

If you are using **Ubuntu**, you can install [PostgreSQL](https://www.postgresql.org/) by running:

```bash
$ sudo apt-get install postgresql-11
```

Or on **macOS** (assuming you have homebrew installed):

```bash
$ brew install postgresql
```

### .env file

Using the `.template.env` fill `DJANGO_SECRET_KEY` and save it as a **new** copy with the name `.env` at the root directory of the project. If you want to use the production database you would need to change the keys from this new file. Pipenv will use this file to load the environment variables


### Python requirements

We recommend to use pyenv to install python 3.6.9 locally and then use pipenv to install the requirements with:

```
$ pipenv install && pipenv shell
```

### Create database

After installing postgres we can create a database and default database user you'll use in your development environment.

```bash
sudo -u postgres -i
```

Now we can run commands as the PostgresSQL superuser. To create a user, type the following command:

```
$ createuser --interactive --pwprompt
Enter name of role to add: neo
Enter password for new role: neoempresarial
Enter it again: neoempresarial
Shall the new role be a superuser? y
```

Then create a database with:

```bash
$ createdb -O neo "neo-intranet"
```

Now we must give user 'neo' the privileges needed to access the database we just created.
You can do this by opening the PostgreSQL CLI in your preferred command line shell. This can be done through running:

```bash
$ psql
```

and you'll be inside the Postgres interface. Now we want to grant access to the recently created database. You can do so by running:

```bash
GRANT ALL PRIVILEGES ON DATABASE "neo-intranet" TO neo;
```
inside your session. After this, if you want quit the Postgres client, simply type `\q`

### Migrate tables

With the development database created and python requirements installed we can migrate the tables. Run the following command:

```bash
$ python backend/manage.py migrate
```

### Create superuser

Don't forget to create a super user for Django with:

```bash
python backend/manage.py createsuperuser
```

### Node and npm package

Install right node version and requirements with:

```bash
nvm
npm run install-dependencies
```

and dev requirements with:

```bash
npm install --only=development
```

### Build frontend

Build frontend for django with:

```bash
npm run build
```
## Usage

After installing everything and build the frontend you can run both backend and frontend just with Django by running:

```bash
python backend/manage.py runserver
```

If you want to run just the frontend part, you can do this with:

```bash
npm run dev
```

You can also run the build option with:

```bash
npm run start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

The content of this project is licensed under the [MIT license](LICENSE).
