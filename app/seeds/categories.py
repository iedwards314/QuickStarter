from app.models import db, Category


# Adds a category, you can add other categories here if needed
def seed_categories():
    games = Category(
        category='Games', image="https://drive.google.com/uc?id=152PYVW_Q_xX4DMwqWpQEFQmo6wHB0Jnd", description='From tabletop adventures to beloved revivals, discover the projects forging the future of gameplay.')
    music = Category(
        category='Music', image="https://drive.google.com/uc?id=10HXyjupqWn4IPnC4Hm0EEFSKibotKkAN", description='Discover new albums, performances, and independent venues from creators using Kickstarter to shape the future of sound.')
    health = Category(
        category='Health', image="https://drive.google.com/uc?id=1JvL7MDB3336hSgJBeR_TgOyg8mxdvUiM",description='Explore projects started by healthcare workers and entrepreneurs to work towards a healthier future.')
    film = Category(
        category='Film', image="https://drive.google.com/uc?id=1w7a11C3IApHmv-oadA2W661sQ0W4hk8-", description='Join forces with the intrepid filmmakers and festival creators changing the way stories get told on screen.')
    food = Category(
        category='Food', image="https://drive.google.com/uc?id=1JuwX8CM8oM-UYEoMerv8HWg9DvacH6a-",description='See how artisans and entrepreneurs are using Kickstarter to break new ground in food.')
    tech = Category(
        category='Tech', image="https://drive.google.com/uc?id=1fzJ06r-iaon8RpYEG7oiNbqH6lwOFs06",description='Discover projects from creators working to build a more beautiful future.')
    epicfail = Category(
        category='Epic Fails', image="https://drive.google.com/uc?id=1APsHbBWqGqKoOnwW_FMEFc7w54Tx-hZR",description="A place for scammers and scum alike, these projects are considered failures and no longer belong anywhere but here.")
    watchout = Category(
        category='Watch Out', image="https://drive.google.com/uc?id=1bbb2Dz_qWtGABOKpXvkXP1LzXtw8DwT6",description="Projects that are so good we want you to keep an eye on them regardless of what they are")

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
