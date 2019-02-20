// We linked the client-side to the graphiql tool, this are the queries themselves
import { gql } from 'apollo-boost';

// Queries
const winesQuery = gql`{ wines { id name color region }}`;
const winesDeatilsQuery = gql`query($id:ID){ wine (id:$id) {id name color region bottle { id name producer year grade }} }`;

// Mutations
const addWineMutation = gql`mutation ($name:String!, $color:String!, $region:String!) { addWine (name:$name, color:$color, region:$region) {name id} }`;
const addBottleMutation = gql`mutation ($name:String!, $producer:String!, $year:String!, $grade:String!, $wineId: ID!) { addBottle (name:$name, producer:$producer, year:$year, grade:$grade, wineId:$wineId) {id name producer year grade wine { name }} }`;


export { winesQuery, winesDeatilsQuery, addWineMutation, addBottleMutation };
