import soco

for zone in soco.discover():
    print(zone.player_name)
