// initialize our app with firebase 9

import {initializeApp} from 'firebase/app'

import {
  getFirestore,collection,getDocs,
  addDoc,deleteDoc,doc,
  onSnapshot,query,where,
  orderBy, serverTimestamp
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCwa0eElKOS4EQo3ZKZ4YqIIAJhEHh6q98",
    authDomain: "fir-9-ank.firebaseapp.com",
    projectId: "fir-9-ank",
    storageBucket: "fir-9-ank.appspot.com",
    messagingSenderId: "253098260386",
    appId: "1:253098260386:web:71ccf578d1be50bb5c24fb"
  };


// init firebase app
initializeApp(firebaseConfig)


// init services 
const db = getFirestore()

// collection ref
const colRef = collection(db,'books')


// queries

// const q = query(colRef,where("author","==","guido"))

// queries
// const q = query(colRef, where("author", "==", "patrick rothfuss"), orderBy('createdAt'))
// queries
const q = query(colRef,  orderBy('createdAt'))

// get  real time collection data
// getDocs(colRef)
// .then((snapshot)=>{
//   // console.log(snapshot.docs)
//   let books  = []
//   snapshot.docs.forEach((doc)=>{
//     books.push({...doc.data(),id:doc.id})
//   })
//   console.log(books)
// })
// .catch(err=>{
//   console.log(err.message)
// })


// onSnapshot function helps us to retrive real time data

onSnapshot(colRef,(snapshot)=>{
  let books  = []
  snapshot.docs.forEach((doc)=>{
    books.push({...doc.data(),id:doc.id})
  })
  console.log(books)

})

// adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  addDoc(colRef,{
    title:addBookForm.title.value,
    author:addBookForm.author.value,
    createAt:serverTimestamp()
  })
  .then(()=>{
    addBookForm.reset()
  })

})


// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)
  console.log(docRef);

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})











