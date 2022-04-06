from app.models import db, Category


# Adds a category, you can add other categories here if needed
def seed_categories():
    games = Category(
        category='Games', image="https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dmlkZW8lMjBnYW1lc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60", description='From tabletop adventures to beloved revivals, discover the projects forging the future of gameplay.')
    music = Category(
        category='Music', image="https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fG11c2ljfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60", description='Discover new albums, performances, and independent venues from creators using Kickstarter to shape the future of sound.')
    health = Category(
        category='Health', image="https://images.unsplash.com/photo-1444491741275-3747c53c99b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGhlYWx0aHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",description='Explore projects started by healthcare workers and entrepreneurs to work towards a healthier future.')
    film = Category(
        category='Film', image="https://images.unsplash.com/photo-1490971588422-52f6262a237a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZpbG18ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60", description='Join forces with the intrepid filmmakers and festival creators changing the way stories get told on screen.')
    food = Category(
        category='Food', image="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",description='See how artisans and entrepreneurs are using Kickstarter to break new ground in food.')
    tech = Category(
        category='Tech', image="https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHRlY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",description='Discover projects from creators working to build a more beautiful future.')
    epicfail = Category(
        category='Epic Fails', image="https://images.unsplash.com/photo-1633707879430-1ca365fb1f6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",description="A place for scammers and scum alike, these projects are considered failures and no longer belong anywhere but here.")
    watchout = Category(
        category='Watch Out', image="https://images.unsplash.com/photo-1478479474071-8a3014d422c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjR8fGZ1bm55fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",description="Projects that are so good we want you to keep an eye on them regardless of what they are")

    db.session.add(games)
    db.session.add(music)
    db.session.add(health)
    db.session.add(film)
    db.session.add(food)
    db.session.add(tech)
    db.session.add(epicfail)
    db.session.add(watchout)

    db.session.commit()


def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
