from app.models import db, Project
import datetime


# Add a project, can add other projects here if needed
def seed_projects():
    # games
    subwaysurfer = Project(
        title="Subway Surfer", description='Subway Surfers is a single player mobile gaming app and website developed by Kiloo. The aim of the game is to outrun a train inspector while dodging oncoming trains, barriers and other objects. Collecting coins on the way gives players advantages such as hover boards and high scores.', goal='45000', end_date='2022-09-15', image='https://drive.google.com/uc?id=1hGN0a6rNFgR0OpBG3KVmRHn9iDkgq5dS', user_id='1', category_id='1')
    roblox = Project(
        title="Roblox", description='Roblox is a global platform where millions of people gather together every day to imagine, create, and share experiences with each other in immersive, user-generated 3D worlds. The types of gameplay on Roblox are just as limitless as the imagination of the creators themselves.', goal='15000', end_date='2022-06-30', image='https://drive.google.com/uc?id=1sWN9uAX0ZNYo1a4_Vtptz_Wt3N4juH1j', user_id='2', category_id='1')
    fortnite = Project(
        title="Fortnite", description='Fortnite is a survival game where 100 players fight against each other in player versus player combat to be the last one standing. It is a fast-paced, action-packed game, not unlike The Hunger Games, where strategic thinking is a must in order to survive.', goal='70000', end_date='2022-08-25', image='https://drive.google.com/uc?id=1_8PZmETf9gWvWFC0bB7e1cljbAHEnpwx', user_id='3', category_id='1')

    # music
    catmusic = Project(
        title="Music 4 Catz", description='Music for Cats is a project to creating music that is scientifically proven to help relax cats.', goal='80000', end_date='2022-10-31', image='https://drive.google.com/uc?id=1CnZBUYb7izDDdVrPmk2QmfXo3qVUlWre', user_id='4', category_id='2')
    anthonymusic = Project(
        title="Help Starving Artist", description='Help fund Anthony Arellano to use his genius musical mind to produce music that will help soothe the soul. ', goal='50000', end_date='2022-11-01', image='https://drive.google.com/uc?id=1fR3voE0P6dsFx4FCnFtMX9D_ClnmYVXl', user_id='5', category_id='2')

    # health
    info4public = Project(
        title="Info4Public", description='Info4Public is a project that aims to achieve their goal by educating the general public about general healthcare information', goal='150000', end_date='2022-09-10', image='https://drive.google.com/uc?id=10a0oSnd7fV9aHZETYOSCi_tPd0SH_X8A', user_id='6', category_id='3')
    fundhealth = Project(
        title="Fund Health", description='Fund Health is working towards a friendlier working environment for all healthcare workers.', goal='500000', end_date='2023-01-01', image='https://drive.google.com/uc?id=1d0bW7xUrbFrWY_liPPMj6ZD7i9eu6avI', user_id='1', category_id='3')

    # film
    morganfilms = Project(
        title="L00per", description="Morgan Films needs help with funding to produce a heist film that rests on a team's ability to disable security cameras using an infinite looping technique.", goal='50000', end_date='2022-07-01', image='https://drive.google.com/uc?id=1jZEen5srKOUJx-NxLkVJqajwpyJAtzv3', user_id='2', category_id='4')

    # food
    potatosalad = Project(
        title="Potato Salad", description="I'm making potato salad.", goal='10', end_date='2022-08-01', image='https://drive.google.com/uc?id=1VQSQ-Yv2AXiSzBX-o3Dl6p02yjAP9kw2', user_id='3', category_id='5')
    healthyjunk = Project(
        title="HealthyJunk", description="HealthyJunk works towards making some of everyone's favorite junk foods healthy again.", goal='75000', end_date='2022-10-15', image='https://drive.google.com/uc?id=1cDMTQ-JqocdcAqifHB7EkGIeyPuGAVkp', user_id='4', category_id='5')
    jasonco = Project(
        title="Jason Co.", description='Jason Co. experiments with food that will help rejuvenate the soul and embrace Korean culture.', goal='100000', end_date='2022-06-21', image='https://drive.google.com/uc?id=1l-GSR0myyAREB1YBYtpMRNZKw6ReAQ-p', user_id='5', category_id='5')

    # tech
    ian = Project(
        title="Ian need help.", description='Help Ian get a computer.', goal='60000', end_date='2022-05-25', image='https://drive.google.com/uc?id=1hhLpcYJcZgxswAnm7IrfKc0oj7hZw6Cu', user_id='6', category_id='6')
    thepill = Project(
        title="The Pill", description='The Pill helps Ian.', goal='150000', end_date='2022-10-01', image='https://drive.google.com/uc?id=1-xGRdrbSNgzYwuxlM9w3IXz9sfU_-TG0', user_id='1', category_id='6')


    db.session.add(subwaysurfer)
    db.session.add(roblox)
    db.session.add(fortnite)
    db.session.add(catmusic)
    db.session.add(anthonymusic)
    db.session.add(info4public)
    db.session.add(fundhealth)
    db.session.add(morganfilms)
    db.session.add(potatosalad)
    db.session.add(healthyjunk)
    db.session.add(jasonco)
    db.session.add(ian)
    db.session.add(thepill)

    db.session.commit()


def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
