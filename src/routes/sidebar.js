const access = JSON.parse(localStorage.getItem('access')).access

let accessMenu = []

for (let i = 0; i < access.length; i++) {
  if (access[i].isParent) {
    accessMenu.push({
      path: access[i].url,
      name: access[i].menuName,
      submenu: []
    })
    for (let j = 0; j < access[i].child.length; j++) {
      accessMenu[i].submenu.push({
        path: access[i].child[j].url,
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d={access[i].child[j].icon} />
        </svg>,
        name: access[i].child[j].name
      })
    }
  } else {
    accessMenu.push({
      path: access[i].url,
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d={access[i].icon} />
      </svg>,
      name: access[i].menuName
    })
  }
}

console.log(accessMenu, "ooooooo")

const routes = accessMenu

export default routes


