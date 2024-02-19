# TodoList

Clone ``git clone https://github.com/Reapx/todolist`` and navigate to ``cd todo-vite-localstorage``.

Then Install all Node Dependencies using ``npm install``.

## Usage
Both Application have the same workflow as a User.
> - Create as many Categories as needed using the ``Create a new Category Entry`` option.
>   - Chose a name and color for your choice for each Category.
> - Create as many Todos for each Category as needed using the ``Create a new Category Entry`` option.
>   - Chose a title, description and a required at date (when the Todo has to be finished) for your Todo.

You can **drag and drop** every todo inside the Category. The order will be saved. <br/>
If a Todo is due, it will be highlighted red. If it is marked as finished (checkbox), it will be highlighted green.

## Vite x Local Storage Application
In the Vite Application I am using ReactJS with no Framework and Vite as Build Tool and Development Server. <br/>
To store the Data I am using Locale Storage. And for the Drag and Drop I use the [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) Package.

> I used Local Storage to store the Data to gain a learn process since I am more used to work with Databases (e.g. Prisma). <br/>
> As long it is just Todos I would create it with Local Storage again. As I expected the moment you add more dimensions to each Todo (Category), using a Database would have been way easier.
