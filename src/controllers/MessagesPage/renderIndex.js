export function renderIndexPage(request, response){

    response.locals.user = request.user
    response.render("MessagesPage/index");
}