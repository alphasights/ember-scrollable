module.exports = function(app) {
  var express = require('express');
  var emailsRouter = express.Router();

  emailsRouter.get('/', function(req, res) {
    if (req.originalUrl.indexOf('page=1&per_page=10') > -1) {
      res.send({
        'emails': [
          {
            'id': 1,
            'subject': 'The Dude Abides',
            'body': "<p>My dirty undies. Laundry, Dude. The whites. And let's also not forget—let's not forget, Dude—that keeping wildlife, an amphibious rodent, for domestic, you know, within the city —that isn't legal either. Look, Larry… Have you ever heard of Vietnam? No ma'am, I didn't mean to give the impression that we're police exactly. We're hoping that it will not be necessary to call the police. Yeah? What do you think happens when you get divorced? You turn in your library card? Get a new driver's license? Stop being Jewish?</p><p>Fine, Dude. As if it's impossible to get some nail polish, apply it to someone else's toe. JUST BECAUSE WE'RE BEREAVED DOESN'T MEAN WE'RE SAPS! DO YOU SEE WHAT HAPPENS, LARRY? Hardly Dude, a new 'vette? The kid's still got, oh, 96 to 97 thousand, depending on the options. And so, Theodore Donald Karabotsos, in accordance with what we think your dying wishes might well have been, we commit your mortal remains to the bosom of the Pacific Ocean, which you loved so well.</p><p>I'm saying, Cynthia's Pomeranian. I'm looking after it while Cynthia and Marty Ackerman are in Hawaii. HERE'S WHAT HAPPENS, LARRY! If the plan gets too complex something always goes wrong. If there's one thing I learned in Nam—. But that is up to little Larry here. Isn't it, Larry? Call the medics, Dude. That wasn't her toe. My point, Dude, is why should we settle for twenty grand when we can keep the entire million. Am I wrong?</p><p>Our basic freedoms. They won't hurt us, Donny. These men are cowards. Is this yours, Larry? Is this your homework, Larry? I'll get you a toe by this afternoon —with nail polish. You're going to enter a world of pain, son. We know that this is your homework. We know you stole a car. Lady, I got buddies who died face-down in the mud so you and I could enjoy this family restaurant!</p><p>Shomer shabbos. Dude, please!… Is this your homework, Larry? Chinaman is not the preferred nomenclature. Asian-American. Please. Near the In-and-Out Burger. Wait in the car, Donny. Sure you'll see some tank battles. But fighting in desert is very different from fighting in canopy jungle. These men are nihilists, Donny, nothing to be afraid of. This kid is in the ninth grade, Dude, and his father is—are you ready for this? —Arthur Digby Sellers.</p>",
            'from': {
              name: 'Johnny Analyst',
              address: 'analyst@email.com'
            },
            'recipients': [
              'Billy Advisor <advisor@email.com>'
            ],
            'cc': [
              'cc@email.com'
            ],
            'sent_at': '2015-05-25T10:30:00.000+00:00',
            'outgoing': true
          },
          {
            'id': 2,
            'subject': 'Re: The Dude Abides',
            'body': "<p>Lebowski ipsum you know, little of this, little of that. Dolor sit amet, consectetur adipiscing elit praesent. Walter, this isn't a First Amendment thing. Ac magna justo pellentesque ac. When will you find these guys? I mean, do you have any promising leads? Lectus quis elit blandit fringilla a ut turpis praesent felis ligula, malesuada. Obviously you're not a golfer. Suscipit malesuada non, ultrices non urna sed orci ipsum, placerat id condimentum rutrum, rhoncus.</p>",
            'from': {
              name: 'Billy Advisor',
              address: 'advisor@email.com'
            },
            'recipients': [
              'Johnny Analyst <analyst@email.com>'
            ],
            'cc': [
              'cc@email.com'
            ],
            'sent_at': '2015-05-26T11:30:00.000+00:00',
            'outgoing': false
          },
          {
            'id': 3,
            'subject': 'Re: The Dude Abides',
            'body': "<p>1972 Pontiac LeBaron. Ac lorem aliquam placerat. I spent most of my time occupying various, um, administration buildings, smoking thai-stick, breaking into the ROTC and bowling. Posuere neque, at dignissim. They're nihilists. Magna ullamcorper in aliquam sagittis massa ac tortor ultrices faucibus curabitur eu mi. Ever hear of the Seattle Seven? Sapien, ut ultricies ipsum morbi eget risus nulla nullam vel. Your goons'll be able to get it off him, mean he's only fifteen and he's flunking social studies. So if you'll just write me a check for my ten per cent… of half a million… fifty grand. Nisi enim, vel auctor ante.</p>",
            'from': {
              name: 'Johnny Analyst',
              address: 'analyst@email.com'
            },
            'recipients': [
              'Billy Advisor <advisor@email.com>'
            ],
            'cc': [
              'cc@email.com'
            ],
            'sent_at': '2015-05-27T10:30:00.000+00:00',
            'outgoing': true
          },
          {
            'id': 4,
            'subject': 'Re: The Dude Abides',
            'body': "<p>Mind if I smoke a jay? Morbi id urna vel felis lacinia. Well sir, it's this rug I have, really tied the room together. Placerat vestibulum turpis nulla, viverra nec volutpat ac, ornare. Ahh, you know. Strikes and gutters, ups and downs. Id lectus cras pharetra faucibus tristique nullam non accumsan justo nulla facilisi integer. No, look. I do mind. The Dude minds. This will not stand, you know, this aggression will not stand, man. Interdum elementum nulla, nec eleifend nisl euismod ac.</p>",
            'from': {
              name: 'Billy Advisor',
              address: 'advisor@email.com'
            },
            'recipients': [
              'Johnny Analyst <analyst@email.com>'
            ],
            'cc': [
              'cc@email.com'
            ],
            'sent_at': '2015-05-28T11:30:00.000+00:00',
            'outgoing': false
          },
          {
            'id': 5,
            'subject': 'Re: The Dude Abides',
            'body': "<p>Yeah. Roadie for Metallica. Speed of Sound Tour. Maecenas vitae eros velit, eu suscipit erat. You know, the usual. Bowl. Drive around. The occasional acid flashback. Integer purus lacus, pretium vel. Nice marmot. Venenatis eu, volutpat non erat donec a metus ac. I mean his wife goes out and owes money and they pee on my rug. Eros dictum aliquet nulla consectetur egestas. That guy treats objects like women, man. Placerat maecenas pulvinar nisl et nisl rhoncus at volutpat felis blandit in.</p>",
            'from': {
              name: 'Johnny Analyst',
              address: 'analyst@email.com'
            },
            'recipients': [
              'Billy Advisor <advisor@email.com>'
            ],
            'cc': [
              'cc@email.com'
            ],
            'sent_at': '2015-05-29T10:30:00.000+00:00',
            'outgoing': true
          },
          {
            'id': 6,
            'subject': 'Re: The Dude Abides',
            'body': "<p>The nail polish, Walter. Libero turpis, laoreet et molestie sed. I'm not Mr. Lebowski; you're Mr. Lebowski. I'm the Dude. Volutpat et erat nulla ut orci quis neque. I don't see any connection to Vietnam, Walter. Consectetur tincidunt aliquam erat volutpat. You got the wrong guy. I'm the Dude, man. Donec aliquam orci eget mi lobortis sed tincidunt diam mattis fusce sem quam, ultricies. It's a complicated case, Maude. Lotta ins, lotta outs, lotta what-have-yous. Sed convallis ac, hendrerit eu urna.</p>",
            'from': {
              name: 'Billy Advisor',
              address: 'advisor@email.com'
            },
            'recipients': [
              'Johnny Analyst <analyst@email.com>'
            ],
            'cc': [
              'cc@email.com'
            ],
            'sent_at': '2015-05-30T11:30:00.000+00:00',
            'outgoing': false
          },
          {
            'id': 7,
            'subject': 'Re: The Dude Abides',
            'body': "<p>His girlfriend gafe up her toe! She sought we'd be getting million dollars! Iss not fair! The Knutsens. It's a wandering daughter job. Bunny Lebowski, man. Her real name is Fawn Knutsen. Her parents want her back. Well sir, it's this rug I have, really tied the room together. They were Nazis, Dude? You know, little of this, little of that. You're going to enter a world of pain, son. We know that this is your homework. We know you stole a car.</p>",
            'from': {
              name: 'Johnny Analyst',
              address: 'analyst@email.com'
            },
            'recipients': [
              'Billy Advisor <advisor@email.com>'
            ],
            'cc': [
              'cc@email.com'
            ],
            'sent_at': '2015-05-31T10:30:00.000+00:00',
            'outgoing': true
          },
          {
            'id': 8,
            'subject': 'Re: The Dude Abides',
            'body': "<p>Stay out of Malibu, Lebowski! Fine, Dude. As if it's impossible to get some nail polish, apply it to someone else's toe. I SAY VEE CUT OFF YOUR CHONSON! Is this yours, Larry? Is this your homework, Larry? …which would place him high in the runnin' for laziest worldwide—but sometimes there's a man… sometimes there's a man. And let's also not forget—let's not forget, Dude—that keeping wildlife, an amphibious rodent, for domestic, you know, within the city —that isn't legal either.</p>",
            'from': {
              name: 'Billy Advisor',
              address: 'advisor@email.com'
            },
            'recipients': [
              'Johnny Analyst <analyst@email.com>'
            ],
            'cc': [
              'cc@email.com'
            ],
            'sent_at': '2015-06-01T11:30:00.000+00:00',
            'outgoing': false
          },
          {
            'id': 9,
            'subject': 'Re: The Dude Abides',
            'body': "<p>Sex. The physical act of love. Coitus. Do you like it? Wait in the car, Donny. They won't hurt us, Donny. These men are cowards. Mein nommen iss Karl. Is hard to verk in zese clozes. Huh? Oh. Yeah. Tape deck. Couple of Creedence tapes. And there was a, uh… my briefcase. You don't go out and make a living dressed like that in the middle of a weekday.</p>",
            'from': {
              name: 'Johnny Analyst',
              address: 'analyst@email.com'
            },
            'recipients': [
              'Billy Advisor <advisor@email.com>'
            ],
            'cc': [
              'cc@email.com'
            ],
            'sent_at': '2015-06-02T10:30:00.000+00:00',
            'outgoing': true
          },
          {
            'id': 10,
            'subject': 'Re: The Dude Abides',
            'body': "<p>Little Lebowski Urban Achievers, yes, and proud we are of all of them. It's a complicated case, Maude. Lotta ins. Lotta outs. And a lotta strands to keep in my head, man. A way out west there was a fella, fella I want to tell you about, fella by the name of Jeff Lebowski. At least, that was the handle his lovin' parents gave him, but he never had much use for it himself. This Lebowski, he called himself the Dude. Now, Dude, that's a name no one would self-apply where I come from. But then, there was a lot about the Dude that didn't make a whole lot of sense to me. And a lot about where he lived, likewise. But then again, maybe that's why I found the place s'durned innarestin'.</p>",
            'from': {
              name: 'Billy Advisor',
              address: 'advisor@email.com'
            },
            'recipients': [
              'Johnny Analyst <analyst@email.com>'
            ],
            'cc': [
              'cc@email.com'
            ],
            'sent_at': '2015-06-03T11:30:00.000+00:00',
            'outgoing': false
          },

        ],
        'meta': {
          'page': 1,
          'per_page': 10,
          'total_count': 16,
          'total_pages': 2
        }
      });
    } else if (req.originalUrl.indexOf('page=2&per_page=10') > -1){
      res.send({
        'emails': [
          {
            'id': 11,
            'subject': 'Yea, well, you know, that’s just like, your opinion, man',
            'body': "<p>I was, uh, one of the authors of the Port Huron Statement —The original Port Huron Statement. Not the compromised second draft. Excuse me! Mark it zero. Next frame. These men are nihilists, Donny, nothing to be afraid of. Nice marmot. And I'm talkin' about the Dude here —sometimes there's a man who, wal, he's the man for his time'n place, he fits right in there—and that's the Dude, in Los Angeles.</p>",
            'from': {
              name: 'Johnny Analyst',
              address: 'analyst@email.com'
            },
            'recipients': [
              'Billy Advisor <advisor@email.com>'
            ],
            'cc': [
              'cc@email.com'
            ],
            'sent_at': '2015-06-04T10:30:00.000+00:00',
            'outgoing': true
          },
          {
            'id': 12,
            'subject': 'Re: Yea, well, you know, that’s just like, your opinion, man',
            'body': "<p>Darkness warshed over the Dude— darker'n a black steer's tookus on a moonless prairie night. There was no bottom. That, or Duder. His Dudeness. Or El Duderino, if you know, you're not into the whole brevity thing. Vee vant zat money, Lebowski. Chinaman is not the preferred nomenclature. Asian-American. Please. I know my rights. Zere ARE no ROOLZ! All right, Plan B. You might want to watch out the front window there, Larry.</p>",
            'from': {
              name: 'Billy Advisor',
              address: 'advisor@email.com'
            },
            'recipients': [
              'Johnny Analyst <analyst@email.com>'
            ],
            'cc': [
              'cc@email.com'
            ],
            'sent_at': '2015-06-05T11:30:00.000+00:00',
            'outgoing': false
          },
          {
            'id': 13,
            'subject': 'Re: Yea, well, you know, that’s just like, your opinion, man',
            'body': "<p>Sir, this is a mortuary, not a rental house. Yes, so we were informed. However, we must of course transmit the remains to you in a receptacle. I know how he likes to present himself; Father's weakness is vanity. Hence the slut. I like your style, Dude. The nail polish, Walter. A man will refer to his 'dick' or his 'rod' or his 'Johnson'. Yes sir. It is our most modestly priced receptacle.</p>",
            'from': {
              name: 'Johnny Analyst',
              address: 'analyst@email.com'
            },
            'recipients': [
              'Billy Advisor <advisor@email.com>'
            ],
            'cc': [
              'cc@email.com'
            ],
            'sent_at': '2015-06-06T10:30:00.000+00:00',
            'outgoing': true
          },
          {
            'id': 14,
            'subject': 'Re: Yea, well, you know, that’s just like, your opinion, man',
            'body': "<p>Mr. Lebowski asked me to repeat that: Her life is in your hands. WE HAVE BUNNY. GATHER ONE MILLION DOLLARS IN UNMARKED NON-CONSECUTIVE TWENTIES. AWAIT INSTRUCTIONS. NO FUNNY STUFF. But that is up to little Larry here. Isn't it, Larry? Jeez. I miss vinyl. Ja, und maybe vee stamp on it und skvush it, Lebowski! Mind if I smoke a jay? Jeffrey, you haven't gone to the doctor.</p>",
            'from': {
              name: 'Billy Advisor',
              address: 'advisor@email.com'
            },
            'recipients': [
              'Johnny Analyst <analyst@email.com>'
            ],
            'cc': [
              'cc@email.com'
            ],
            'sent_at': '2015-06-07T11:30:00.000+00:00',
            'outgoing': false
          },
          {
            'id': 15,
            'subject': 'Re: Yea, well, you know, that’s just like, your opinion, man',
            'body': "<p>Is this your homework, Larry? I, uh… money, yeah, I gotta respectfully, 69 you know, tender my resignation on that matter, 'cause it looks like your mother really was kidnapped after all. My point, Dude, is why should we settle for twenty grand when we can keep the entire million. Am I wrong? JUST BECAUSE WE'RE BEREAVED DOESN'T MEAN WE'RE SAPS! I mean his wife goes out and owes money and they pee on my rug.</p>",
            'from': {
              name: 'Johnny Analyst',
              address: 'analyst@email.com'
            },
            'recipients': [
              'Billy Advisor <advisor@email.com>'
            ],
            'cc': [
              'cc@email.com'
            ],
            'sent_at': '2015-06-08T10:30:00.000+00:00',
            'outgoing': true
          },
          {
            'id': 16,
            'subject': 'Re: Yea, well, you know, that’s just like, your opinion, man',
            'body': "<p>That had not occurred to us, Dude. Say friend, ya got any more a that good sarsaparilla? Just me and Charlie, man, eyeball to eyeball. You think veer kidding und making mit de funny stuff? Walter, you can't do that. These guys're like me, they're pacifists. Smokey was a conscientious objector. Hello! Do you speak English? Parla usted Inglese? I'll say it again. Did I urinate on your rug?</p>",
            'from': {
              name: 'Billy Advisor',
              address: 'advisor@email.com'
            },
            'recipients': [
              'Johnny Analyst <analyst@email.com>'
            ],
            'cc': [
              'cc@email.com'
            ],
            'sent_at': '2015-06-09T11:30:00.000+00:00',
            'outgoing': false
          }
        ],
        'meta': {
          'page': 2,
          'per_page': 10,
          'total_count': 16,
          'total_pages': 2
        }
      });
    }
  });

  app.use('/api/v2/emails', emailsRouter);
};
