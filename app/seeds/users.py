from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', image="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/950.jpg", password='password')

    over_caffinated = User(
        username='over_caffinated', email='over_caffinated@aa.io', image= "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/500.jpg", password='password2')

    living_the_dream = User(
        username='living_the_dream', email='living_the_dream@aa.io', image="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/550.jpg", password='password3')

    figured_life_out = User(
        username='figured_life_out', email='figured_life_out@aa.io', image="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/725.jpg", password='password4')

    overpowered_and_winning = User(
        username='overpowered_and_winning', email='overpowered_and_winning@aa.io', image="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/860.jpg", password='password5')

    namaste_and_always_chillin = User(
        username='namaste_and_always_chillin', email='namaste_and_always_chillin@aa.io', image="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/952.jpg", password='password5')

    db.session.add(demo)
    db.session.add(over_caffinated)
    db.session.add(living_the_dream)
    db.session.add(figured_life_out)
    db.session.add(overpowered_and_winning)
    db.session.add(namaste_and_always_chillin)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
