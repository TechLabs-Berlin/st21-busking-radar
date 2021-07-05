import React from 'react';

const BuskerInfoCard = ({ name, profilePic, socialLinks, genre, about, history, id }) => {
    return (
        <div className='busker-info-card' onClick={() => {
            history.push({
                pathname: `/busker/${id}`,
                search: `?name=${name}&socialLinks=${JSON.stringify(socialLinks)}&genre=${genre}&about=${about}`
            })
        }} >
            <div className='text-info'>
                <h3 className='hd-sm'>{name}</h3>
                <div className='soc-links-container' >
                    {socialLinks.map(link => {
                        if (link.name === 'facebook') {
                            return <a href={link.link}><i class="fab fa-2x fa-facebook-square icon-color"></i>  </a>
                        } else if (link.name === 'youtube') {
                            return <a href={link.link}><i class="fab fa-2x fa-youtube icon-color"></i></a>
                        } else {
                            return <a href={link.link}><i class="fab fa-2x fa-spotify icon-color"></i></a>
                        }
                    })}
                </div>
                <div className='prof-info'>
                    <p className='prof-info-genre'>{genre}</p>
                </div>
            </div>
            <div className='prof-pic-container'>
                <img className='prof-pic' src={profilePic} />
            </div>
        </div>
    )
}

export default BuskerInfoCard;