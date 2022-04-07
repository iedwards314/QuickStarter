from app.models import db, Update


# Add an update, can add other stuff here if needed
def seed_updates():
    # user4 = figured_life_out
    update1 = Update(
        title="C'mon Guys...we need this!",
        update="Not seeing a lot of help ",
        image_url="",
        project_id="4",
    )

    update2 = Update(
        title="We can make a difference!",
        update="I know deep down we can do this",
        image_url="",
        project_id="4",
    )

    update3 = Update(
        title="Well...Not Cool",
        update="Guess I'm seeing the otherside of humanity",
        image_url="",
        project_id="4",
    )

    update4 = Update(
        title="Totally doing this for the cash",
        update="I mean if you couldn't tell, I'm after the $$",
        image_url="",
        project_id="9",
    )

    db.session.add(update1)
    db.session.add(update2)
    db.session.add(update3)
    db.session.add(update4)

    db.session.commit()


def undo_updates():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
