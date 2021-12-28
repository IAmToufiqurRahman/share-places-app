import React from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/PlaceList'

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrappers in the world',
    imageUrl: 'https://www.thoughtco.com/thmb/6NX8SEKwn3qmJbAd9N6avAImSbc=/1777x1333/smart/filters:no_upscale()/187410874_HighRes-resize-56a48d293df78cf77282efa6.jpg',
    address: '20 W 34th St, New York, NY 10001, United States',
    location: {
      lat: 40.7484405,
      lng: -73.9878531
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrappers in the world',
    imageUrl: 'https://www.thoughtco.com/thmb/6NX8SEKwn3qmJbAd9N6avAImSbc=/1777x1333/smart/filters:no_upscale()/187410874_HighRes-resize-56a48d293df78cf77282efa6.jpg',
    address: '20 W 34th St, New York, NY 10001, United States',
    location: {
      lat: 40.7484405,
      lng: -73.9878531
    },
    creator: 'u2'
  }
]

function UserPlaces() {
  const userId = useParams().userId
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId)

  return <PlaceList items={loadedPlaces} />
}

export default UserPlaces

// this component will fetch and renders all the places that belong to a corresponding user
