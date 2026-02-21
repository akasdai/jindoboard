import "./components/PhotoCard.js";

const photoGrid = document.getElementById("photo-grid");

const photos = [
    { src: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Jindo Dog 1" },
    { src: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Jindo Dog 2" },
    { src: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Jindo Dog 3" },
    { src: "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Jindo Dog 4" },
    { src: "https://images.unsplash.com/photo-1588269845464-8993565cac3a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Jindo Dog 5" },
    { src: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Jindo Dog 6" },
];

photos.forEach(photo => {
    const photoCard = document.createElement("photo-card");
    photoCard.setAttribute("src", photo.src);
    photoCard.setAttribute("title", photo.title);
    photoGrid.appendChild(photoCard);
});