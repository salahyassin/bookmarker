var bookmarkName = document.getElementById('bookmarkName');
var bookmarkUrl = document.getElementById('bookmarkUrl');
var bookmarks=[];
if(localStorage.getItem('allBookmarks')){
    bookmarks=JSON.parse(localStorage.getItem('allBookmarks'))
    displaySites()
}
function isValidURL(url) {
    const urlPattern = new RegExp(
        '^https?:\\/\\/' + // Protocol (http or https)
        '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // Domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
        '(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*' + // Port and path
        '(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?' + // Query string
        '(\\#[-a-zA-Z\\d_]*)?$', // Fragment locator
        'i'
    );
    return urlPattern.test(url);
}
function addBookmark(){
    var siteName = bookmarkName.value.trim();
    var siteUrl = bookmarkUrl.value.trim();

    // Check if inputs are empty
    if (siteName === '' || siteUrl === '') {
        Swal.fire({
            title: 'Error!',
            text: 'Enter site name and url',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        return;
    }

    // Validate the URL
    if (!isValidURL(siteUrl)) {
        Swal.fire({
            title: 'Error!',
            text: 'Please enter a valid url',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        return;
    }
    var bookmark={
        siteName: bookmarkName.value ,
        siteUrl : bookmarkUrl.value
    }
    bookmarks.push(bookmark);
    localStorage.setItem('allBookmarks', JSON.stringify(bookmarks));
    console.log(bookmarks);
    clearInputs()
    displaySites()
}
function clearInputs(){
    bookmarkName.value=null;
    bookmarkUrl.value=null;
}

function displaySites(){
    var cartona =''
    for(i=0; i<bookmarks.length; i++){
        cartona +=`
        <tr>
            <td>${i+1}</td>
            <td> ${bookmarks[i].siteName}</td>
            <td><a href="${bookmarks[i].siteUrl}" target="_blank" class="btn visit-btn "><i class="fa-regular fa-eye"></i> Visit</a></td>
            <td><a> <button onclick="deletSite(${i})" class="btn delet-btn"><i class="fa-solid fa-trash"></i> Delete</button></a></td>
        </tr>
        `
    }
    document.getElementById('tableData').innerHTML=cartona
}
function deletSite(index){
    bookmarks.splice(index,1);
    localStorage.setItem('allBookmarks', JSON.stringify(bookmarks));
    displaySites();
}