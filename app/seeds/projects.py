from app.models import db, Project


# Add a project, can add other projects here if needed
def seed_projects():
    # games
    subwaysurfer = Project(
        description='Come checkout this crazy new game idea we have!', goal='', end_date='', image='', user_id='', category_id='')
    x = Project(
        description='', goal='', end_date='', image='', user_id='', category_id='')
    x = Project(
        description='', goal='', end_date='', image='', user_id='', category_id='')

    # music
    x = Project(
        description='', goal='', end_date='', image='', user_id='', category_id='')
    x = Project(
        description='', goal='', end_date='', image='', user_id='', category_id='')

    # health
    x = Project(
        description='', goal='', end_date='', image='', user_id='', category_id='')
    x = Project(
        description='', goal='', end_date='', image='', user_id='', category_id='')

    # film
    x = Project(
        description='', goal='', end_date='', image='', user_id='', category_id='')

    # food
    x = Project(
        description='', goal='', end_date='', image='', user_id='', category_id='')
    x = Project(
        description='', goal='', end_date='', image='', user_id='', category_id='')
    x = Project(
        description='', goal='', end_date='', image='', user_id='', category_id='')

    # tech
    x = Project(
        description='', goal='', end_date='', image='', user_id='', category_id='')
    x = Project(
        description='', goal='', end_date='', image='', user_id='', category_id='')


    db.session.add()
    db.session.add()
    db.session.add()
    db.session.add()
    db.session.add()
    db.session.add()
    db.session.add()
    db.session.add()
    db.session.add()
    db.session.add()
    db.session.add()
    db.session.add()
    db.session.add()

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
