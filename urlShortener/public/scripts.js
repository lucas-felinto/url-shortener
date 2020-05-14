const button = document.querySelector('.copy')
const copied = document.querySelector('.hidden')


button.addEventListener('click', function() {
    const urlCopy = document.querySelector('.shortUrl')
    urlCopy.select()
    document.execCommand('Copy')

    copied.classList.remove("hidden")

})