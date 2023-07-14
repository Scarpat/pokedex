export function getPokemonColor(pokemonType: string) {
    switch (pokemonType.toLowerCase()) {
        case 'normal':
            return 'bg-gray-300';
        case 'fire':
            return 'bg-red-500';
        case 'water':
            return 'bg-blue-500';
        case 'electric':
            return 'bg-yellow-400';
        case 'grass':
            return 'bg-green-500';
        case 'ice':
            return 'bg-blue-200';
        case 'fighting':
            return 'bg-yellow-900';
        case 'poison':
            return 'bg-purple-500';
        case 'ground':
            return 'bg-yellow-600';
        case 'flying':
            return 'bg-gray-400';
        case 'psychic':
            return 'bg-pink-500';
        case 'bug':
            return 'bg-green-600';
        case 'rock':
            return 'bg-yellow-800';
        case 'ghost':
            return 'bg-purple-700';
        case 'dragon':
            return 'bg-purple-900';
        case 'dark':
            return 'bg-black';
        case 'steel':
            return 'bg-gray-500';
        case 'fairy':
            return 'bg-pink-400';
        default:
            return 'bg-gray-100';
    }
}