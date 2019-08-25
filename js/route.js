m.route(main, "/pokemons", {
    "/pokemons": Pokemons,
    "/pokemons-detail/:id": PokemonDetail
})