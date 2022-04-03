from app.models import db, Category


# Adds a category, you can add other categories here if needed
def seed_categories():
    games = Category(
        category='Games', description='From tabletop adventures to beloved revivals, discover the projects forging the future of gameplay.')
    music = Category(
        category='Music', description='Discover new albums, performances, and independent venues from creators using Kickstarter to shape the future of sound.')
    health = Category(
        category='Health', description='Explore projects started by healthcare workers and entrepreneurs to work towards a healthier future.')
    film = Category(
        category='Film', description='Join forces with the intrepid filmmakers and festival creators changing the way stories get told on screen.')
    food = Category(
        category='Food', description='See how artisans and entrepreneurs are using Kickstarter to break new ground in food.')
    tech = Category(
        category='Tech', description='Discover projects from creators working to build a more beautiful future.')


    db.session.add(games)
    db.session.add(music)
    db.session.add(health)
    db.session.add(film)
    db.session.add(food)
    db.session.add(tech)

    db.session.commit()


def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
